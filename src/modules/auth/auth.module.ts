import { Module } from '@nestjs/common';
import { CustomersAuthModule } from './customers-auth/customers-auth.module';
import { ProjectAuthModule } from './project-auth/project-auth.module';
import { CustomersProjectAuthModule } from './customers-project-auth/customers-project-auth.module';

@Module({
  imports: [CustomersAuthModule, ProjectAuthModule, CustomersProjectAuthModule],
  providers: [
    CustomersAuthModule,
    ProjectAuthModule,
    CustomersProjectAuthModule,
  ],
  exports: [CustomersAuthModule, ProjectAuthModule, CustomersProjectAuthModule],
})
export class AuthModule {}
