import app from './app';

import '../database/TypeORM/connection';

app.listen(3333, () => {
  console.log('API Running on port 3333');
});
