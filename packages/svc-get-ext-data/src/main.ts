import { AppModule } from './app.module'
import { bootstrap } from '@kedo-team/util-nestjs'
import { transports, format } from 'winston'
import { WinstonModule } from 'nest-winston'
import { TracerTransport } from '@kedo-team/tracer'

const logger = WinstonModule.createLogger({
    format: format.combine(
        format.splat(),
        format.colorize(),
        format.timestamp(),
        format.simple(),
    ),
    transports: [
        new transports.Console(),
        new TracerTransport(),
    ]
})

bootstrap(AppModule, logger)
