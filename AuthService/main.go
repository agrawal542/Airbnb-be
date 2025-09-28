package main

import (
	"AuthService/app"
	config "AuthService/config/env"
)

func main() {

	config.Load()

	config := app.NewConfig()
	app := app.NewApplication(*config)

	app.Run()
}
