# koa2-jwt-mysql-boilerplates

```
npm install
```

By default, `npm run dev` script uses node-dev. Or you can use nodemon or anything you like.
```
npm install node-dev -g
```


Edit `~/.db_config`
```
{
	"production": {
		"host": "YOUR_DB_HOST",
		"account": "YOUR_DB_ACCOUNT",
		"password": "YOUR_DB_PASSWORD",
		"port": 3306
	},
	"test": {
		"host": "YOUR_DB_HOST",
		"account": "YOUR_DB_ACCOUNT",
		"password": "YOUR_DB_PASSWORD",
		"port": 3306
	},
	"dev": {
		"host": "YOUR_DB_HOST",
		"account": "YOUR_DB_ACCOUNT",
		"password": "YOUR_DB_PASSWORD",
		"port": 3306
	}
}
```

Modify `db/index`, change the database names
```
const DB_TEST = 'db_test';
const DB_PRODUCTION = 'db';
const DB_DEV = 'db_dev';
```


```
npm run lint
```


```
npm run dev
```


```
npm test && npm start
```