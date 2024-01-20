import EvnVariables from '../config';

console.log(process.env); // Log the entire process.env object
console.log(EvnVariables.DATABASE_URL, 'config');
export const dbConnection = {
    url: EvnVariables.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  };
