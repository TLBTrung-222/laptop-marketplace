import { Session } from 'express-session'
import { AccountEntity } from 'src/database/entities/account.entity'
import 'express'

// declaration merging
declare module 'express' {
    interface Request {
        session: Session
        account?: AccountEntity
    }
}
