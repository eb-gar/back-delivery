import { PartialType } from '@nestjs/mapped-types';
import { CreateMotorizedDto } from './create-motorized.dto';

export class UpdateMotorizedDto extends PartialType(CreateMotorizedDto) {}
