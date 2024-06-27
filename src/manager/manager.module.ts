import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { generalVenueManagerSchemas, tb_general_venue_manager } from './schemas/general.venue.manager.schemas.ts';
import { tb_user, userSchema } from './schemas/user.schemas';
import { bookingSchema, tb_booking } from './schemas/booking.schema';
import { slotSchema, tb_slot } from './schemas/slot.schema';
import { tb_venue, venueSchema } from './schemas/venue.schema';
import { communityDetailSchema, tb_community_detail } from './schemas/community.details.schema';
import { communitySchema, tb_community } from './schemas/community.schema';
import { generalSchema, tb_general_details } from './schemas/general.details.schema';
import { CronJobService } from 'src/cron-job/cron-job.service';

@Module({
  imports:[MongooseModule.forFeature(
    [
      {name:tb_general_venue_manager.name,schema:generalVenueManagerSchemas},
      {name:tb_user.name,schema:userSchema},
      {name:tb_booking.name,schema:bookingSchema},
      {name:tb_slot.name,schema:slotSchema},
      {name:tb_venue.name,schema:venueSchema},
      {name:tb_community_detail.name,schema:communityDetailSchema},
      {name:tb_community.name,schema:communitySchema},
      {name:tb_general_details.name,schema:generalSchema}
    ])],
  providers: [ManagerService,CronJobService],
  controllers: [ManagerController],
  exports:[ManagerService]
})
export class ManagerModule {}
