import { Module } from '@nestjs/common';
import { CronJobController } from './cron-job.controller';
import { CronJobService } from './cron-job.service';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports:[ManagerModule],
  controllers: [CronJobController],
  providers: [CronJobService,ManagerModule],
  exports:[CronJobService]
})
export class CronJobModule {}
