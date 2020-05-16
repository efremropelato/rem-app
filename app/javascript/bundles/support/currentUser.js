import { EventEmitter } from "events";
class CurrentUser extends EventEmitter {
    constructor() {
        super();
        this.id = null
        this.email = null
        this.created_at = null
        this.updated_at = null

        this.setUser = (user) =>{
            this.id = user.id
            this.email = user.email
            this.created_at = user.created_at
            this.updated_at = user.updated_at
        }
    }
  }

const currentUser = new CurrentUser();
export default currentUser;