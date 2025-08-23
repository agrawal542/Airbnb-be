package main

import (
	"AuthService/app"
)

func main() {

	config := app.Config{
		Addr: ":3011",
	}
	app := app.Application{
		Config: config,
	}

	app.Run()
}
