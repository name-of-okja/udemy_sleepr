import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Payload } from '@nestjs/microservices';
import { NotifiyEmailDto } from './dto/notifiy-email.dto';
import {
  NotificationsServiceController,
  NotificationsServiceControllerMethods,
} from '@app/common';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  async notifyEmail(@Payload() data: NotifiyEmailDto) {
    this.notificationsService.notifiyEmial(data);
  }
}
