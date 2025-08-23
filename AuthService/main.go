package main

import (
	"AuthService/app"
)

func main() {

	config := app.NewConfig(":3011")
	app := app.NewApplication(*config)

	app.Run()
}
