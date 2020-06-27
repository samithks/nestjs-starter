import { hash } from 'bcrypt';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { SALT_ROUNDS } from '../config/constant';
import { User } from '../models/user/user.entity';



@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<User> {


    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return User;
    }

    /**
     * Called before post insertion.
     */
    async beforeInsert(event: InsertEvent<User>) {
        event.entity.password = await hash(event.entity.password, SALT_ROUNDS);
    }

    /**
     * Called before post insertion.
     */
    async beforeUpdate(event: InsertEvent<User>) {
        event.entity.password = await hash(event.entity.password, SALT_ROUNDS);
    }
}