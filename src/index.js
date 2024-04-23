import { pool_metas, pool_test} from './connections/dbs.js'

const test_connection = async () => {
  const conn = await pool_test.getConnection()
  console.log('Connected to test database')
  conn.release()
}

const metas_connection = async () => {
  const conn = await pool_metas.getConnection()
  console.log('Connected to metas database')
  conn.release()
}

test_connection()
metas_connection()