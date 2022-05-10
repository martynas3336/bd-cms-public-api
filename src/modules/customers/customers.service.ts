import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PartialDeep } from 'type-fest';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { Customer } from './entities/customer.entity';
import { v4 as uuidv4 } from 'uuid';
import { EmailTemplatesService } from '../email-templates/email-templates.service';
import { CustomerNotFoundError } from '../../exceptions/inner-errors/customer.not.found.error';
import { CustomerTypesEnum } from '../../enums/customerTypes.enum';
import { CustomerStatusesEnum } from '../../enums/customerStatuses.enum';
import { CustomerEmailActionsEnum } from '../../enums/customerEmailActions.enum';
import { Project } from '../project/entities/project.entity';

import { EmailConfirmTypesEnum } from '../../enums/emailConfirmTypes.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { ResetCustomerParamsType } from './types/reset-customer-params.type';
import { ValidateParamsType } from './types/validate-params.type';
import { PersonalCustomerType } from './types/personal-customer.type';
import { LegalCustomerType } from './types/legal-customer.type';
import { UpdateCustomerDataType } from './types/update-customer-data.type';
import { ResetInitCustomerDataType } from './types/reset-init-customer-data.type';
import { CustomersAuthService } from '../auth/customers-auth/customers-auth.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(ModelNamesEnum.CUSTOMER)
    private readonly customerRepository: Model<Customer>,
    private readonly sendgridService: SendgridService,
    private readonly emailTemplatesService: EmailTemplatesService,
    private readonly customersAuthService: CustomersAuthService,
  ) {}

  async resetInit(customer: ResetInitCustomerDataType, project: Project) {
    const result = await this.customerRepository.findOne(customer);
    if (!result) throw new CustomerNotFoundError();
    const code = this.generateEmailCode();
    await this.customerRepository.updateOne(
      { ...customer, status: CustomerStatusesEnum.ACTIVE },
      { code },
    );

    await this.email({
      emailConfirmUrl: project.emailConfirmUrl,
      emailTo: customer.email,
      email: customer.email,
      code,
      confirmType: project.emailConfirmType,
      customerType: CustomerTypesEnum.REGISTERED,
    });
    return {};
  }

  async reset(customer: ResetCustomerParamsType) {
    const result = await this.customerRepository.findOne({
      email: customer.email,
      status: CustomerStatusesEnum.ACTIVE,
    });
    if (!result) throw new CustomerNotFoundError();

    const passwordHash = this.customersAuthService.encryptPassword(
      customer.password,
    );
    await this.customerRepository.updateOne(
      {
        email: customer.email,
        status: CustomerStatusesEnum.ACTIVE,
        code: customer.code,
      },
      {
        passwordHash: passwordHash,
        code: uuidv4(),
      },
    );
    return {};
  }

  generateEmailCode() {
    return (
      uuidv4().toString().substr(0, 4).toLocaleUpperCase().trim() || '00FF'
    );
  }

  async createLegalCustomer(customer: LegalCustomerType, project: Project) {
    const result = await this.customerRepository.findOne({
      email: customer.email,
      type: CustomerTypesEnum.REGISTERED,
    });
    if (result) throw new Error('Customer already exists');
    const passwordHash = this.customersAuthService.encryptPassword(
      customer.password,
    );
    const code = this.generateEmailCode();
    await this.save({
      ...customer,
      passwordHash,
      code,
      projectId: project._id,
      type: CustomerTypesEnum.REGISTERED,
    });
    await this.email({
      emailConfirmUrl: project.emailConfirmUrl,
      emailTo: customer.email,
      email: customer.email,
      code,
      confirmType: project.emailConfirmType,
      customerType: CustomerTypesEnum.REGISTERED,
    });
    return {};
  }

  async createPersonalCustomer(
    customer: PersonalCustomerType,
    project: Project,
  ) {
    const result = await this.customerRepository.findOne({
      email: customer.email,
      type: CustomerTypesEnum.REGISTERED,
    });
    if (result) throw new Error('Customer already exists');
    const passwordHash = this.customersAuthService.encryptPassword(
      customer.password,
    );
    const code = this.generateEmailCode();
    await this.save({
      ...customer,
      passwordHash,
      code,
      projectId: project._id,
      type: CustomerTypesEnum.REGISTERED,
    });
    await this.email({
      emailConfirmUrl: project.emailConfirmUrl,
      emailTo: customer.email,
      email: customer.email,
      code,
      confirmType: project.emailConfirmType,
      customerType: CustomerTypesEnum.REGISTERED,
    });
    return {};
  }

  async createAnonymousLegalCustomer(
    customer: Omit<LegalCustomerType, 'password'>,
    project: Project,
  ) {
    const code = this.generateEmailCode();
    await this.save({
      ...customer,
      code,
      projectId: project._id,
      email: uuidv4(),
      type: CustomerTypesEnum.ANONYMOUS,
    });
    await this.email({
      emailConfirmUrl: project.emailConfirmUrl,
      emailTo: customer.email,
      email: customer.email,
      code,
      confirmType: project.anonymousEmailConfirmType,
      customerType: CustomerTypesEnum.ANONYMOUS,
    });
    return {};
  }

  async createAnonymousPersonalCustomer(
    customer: Omit<PersonalCustomerType, 'password'>,
    project: Project,
  ) {
    const code = this.generateEmailCode();
    await this.save({
      ...customer,
      code,
      projectId: project._id,
      passwordHash: uuidv4(),
      type: CustomerTypesEnum.ANONYMOUS,
    });
    await this.email({
      emailConfirmUrl: project.emailConfirmUrl,
      emailTo: customer.email,
      email: customer.email,
      code,
      confirmType: project.anonymousEmailConfirmType,
      customerType: CustomerTypesEnum.ANONYMOUS,
    });
    return {};
  }

  async validate(customer: ValidateParamsType) {
    const c: Customer = await this.customerRepository.findOne({
      code: customer.code,
      email: customer.email,
    });
    if (!c) throw new CustomerNotFoundError();
    await this.customerRepository.updateOne(customer, {
      status: CustomerStatusesEnum.ACTIVE,
      code: uuidv4(),
    });
    if (c.type === CustomerTypesEnum.ANONYMOUS) {
      const { accessToken: token } = await this.customersAuthService.login(c);
      return { token };
    }
    return {};
  }

  async email({
    emailConfirmUrl,
    emailTo,
    email,
    code,
    confirmType,
    customerType,
  }: {
    emailConfirmUrl: string;
    emailTo: string;
    email: string;
    code: string;
    confirmType: EmailConfirmTypesEnum;
    customerType: CustomerTypesEnum;
  }) {
    const emailBody = this.getEmailBody({
      emailConfirmUrl,
      confirmType,
      customerType,
      code,
      email,
    });

    await this.sendgridService.sendEmail({
      to: emailTo,
      subject: 'Please validate your account',
      emailBody,
    });
  }

  getEmailBody({
    emailConfirmUrl,
    confirmType,
    customerType,
    code,
    email,
  }: {
    emailConfirmUrl: string;
    email: string;
    code: string;
    confirmType: EmailConfirmTypesEnum;
    customerType: CustomerTypesEnum;
  }) {
    if (confirmType === EmailConfirmTypesEnum.CONFIRM_LINK) {
      const url = new URL(emailConfirmUrl);
      url.searchParams.append(
        'action',
        CustomerEmailActionsEnum.VALIDATE_EMAIL,
      );
      url.searchParams.append('code', code);
      url.searchParams.append('confirmType', confirmType);
      url.searchParams.append('email', email);
      if (customerType === CustomerTypesEnum.REGISTERED) {
        return this.emailTemplatesService.emailAccountApproveConfirmLink(
          url.href,
          'Validate your account',
        );
      }
      if (customerType === CustomerTypesEnum.ANONYMOUS) {
        return this.emailTemplatesService.emailAnonymousAccountApproveConfirmLink(
          url.href,
          'Validate your account',
        );
      }
    }

    if (confirmType === EmailConfirmTypesEnum.RAW_CODE) {
      if (customerType === CustomerTypesEnum.REGISTERED) {
        return this.emailTemplatesService.emailAccountApproveCode(code);
      }
      if (customerType === CustomerTypesEnum.ANONYMOUS) {
        return this.emailTemplatesService.emailAnonymousAccountApproveCode(
          code,
        );
      }
    }
    return '';
  }

  async save(customer: Partial<Customer>) {
    return await new this.customerRepository({
      ...customer,
    }).save();
  }

  async updateCustomerById(customerId: string, data: UpdateCustomerDataType) {
    const customer: PartialDeep<Customer> = {};
    if (data.name) customer.name = data.name;
    if (data.surname) customer.surname = data.surname;
    if (data.email) customer.email = data.email;
    if (data.phone) customer.phone = data.phone;
    if (data.country) customer.country = data.country;
    if (data.city) customer.city = data.city;
    if (data.localAdministration)
      customer.localAdministration = data.localAdministration;
    if (data.street) customer.street = data.street;
    if (data.house) customer.house = data.house;
    if (data.flat) customer.flat = data.flat;
    if (data.postCode) customer.postCode = data.postCode;
    if (data.companyDetails) {
      customer.companyDetails = {};
      if (data.companyDetails.companyName)
        customer.companyDetails.companyName = data.companyDetails.companyName;
      if (data.companyDetails.companyLegalCode)
        customer.companyDetails.companyLegalCode =
          data.companyDetails.companyLegalCode;
      if (data.companyDetails.companyTaxCode)
        customer.companyDetails.companyTaxCode =
          data.companyDetails.companyTaxCode;
      if (data.companyDetails.country)
        customer.companyDetails.country = data.companyDetails.country;
      if (data.companyDetails.city)
        customer.companyDetails.city = data.companyDetails.city;
      if (data.companyDetails.localAdministration)
        customer.companyDetails.localAdministration =
          data.companyDetails.localAdministration;
      if (data.companyDetails.street)
        customer.companyDetails.street = data.companyDetails.street;
      if (data.companyDetails.house)
        customer.companyDetails.house = data.companyDetails.house;
      if (data.companyDetails.flat)
        customer.companyDetails.flat = data.companyDetails.flat;
      if (data.companyDetails.postCode)
        customer.companyDetails.postCode = data.companyDetails.postCode;
    }
    await this.customerRepository.updateOne({ _id: customerId }, customer);
    return {};
  }
}
