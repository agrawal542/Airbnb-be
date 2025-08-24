package main

import (
	"AuthService/app"
	dbConfig "AuthService/config/db"
	config "AuthService/config/env"
)

func main() {

	config.Load()
	dbConfig.SetupDB()

	config := app.NewConfig()
	app := app.NewApplication(*config)

	app.Run()
}
