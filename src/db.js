import { initializeDatabase } from './db/queries'
import { messages, users } from './db/sql'

const DATABASE_NAME = process.env.PROGRESQL_DATABASE

export class DatabaseAccessor {
  client
  /**
   * 
   * @param {Client} client 
   */
  constructor(client) {
    this.client = client;
  }

  shouldAbort(err) {
    if (err) {
      console.error('Error in transaction', err.stack)
      client.query('ROLLBACK', (err) => {
        if (err) {
          console.error('Error rolling back client', err.stack)
        }
      })
    }
    return !!err
  }

  async initialize() {
    await this.client.connect()
    this.client.query(initializeDatabase)
  }

  addUser(userId) {
    this.client.query(addNewUserQuery, [userId])
  }

  async claim(userId) {
    // // BEGIN statement because ROLLBACKS are essential
    // try {
    //   await this.client.query('BEGIN')
    //   /**
    //    * Get number of messages
    //    */
    //   const query = messages
    //     .select(`COUNT(${messages.name})`)
    //     .from(messages)
    //     .where(messages.userid.equals(userId))
    //     .toQuery()
    //   const res = await this.client.query(query.text, query.values)
    //   /**
    //    * Delete the messages from database
    //    */
    //   const query_1 = messages
    //     .delete()
    //     .where(messages.userid.equals(userId))
    //     .toQuery()
    //   const { res: res_1, query: query_2 } = {
    //     res,
    //     query: this.client.query(query_1.text, query_1.values),
    //   }
    //   const numberMessages = res_1.rows[0]
    //   /**
    //    * Send tokens
    //    */
    //   console.debug(`Sent ${numberMessages} to tokens`)
    //   /**
    //    * End transaction
    //    */
    //   return await this.client.query('COMMIT')
    // } catch (err) {
    //   return this.shouldAbort(err)
    // }
  }

  incrementMessageCount(userId, messageId) {
    // const fields = {
    //   id: messageId,
    //   userid: userId,
    // }
    // const query = messages.insert(fields).toQuery()
    // this.client.query(query.text, query.values)
  }
}
