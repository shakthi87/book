import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ManagerService } from 'src/manager/manager.service';

@Injectable()
export class CronJobService {
    private readonly logger=new Logger(CronJobService.name)
    constructor(
        private readonly managerService:ManagerService
    ){}
    @Cron(CronExpression.EVERY_10_SECONDS)
        async slotinterval(){
            await this.managerService.slotinterval()
        }
    
}
