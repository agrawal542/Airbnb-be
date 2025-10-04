package app

import (
	dbConfig "AuthService/config/db"
	config "AuthService/config/env"
	"AuthService/controllers"
	repo "AuthService/db/repositories"
	"AuthService/router"
	"AuthService/services"
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Addr string
}

type Application struct {
	Config Config
}

func NewConfig() *Config {
	port := config.GetString("PORT", ":8080")
	return &Config{
		Addr: port,
	}
}

func NewApplication(config Config) *Application {
	return &Application{
		Config: config,
	}
}

func (app *Application) Run() error {

	db, err := dbConfig.SetupDB()
	if err != nil {
		fmt.Println("Error setting an database:", err)
		return err
	}

	ur := repo.NewUserRepository(db)
	us := services.NewUserService(ur)
	uc := controllers.NewUserController(us)
	uRouter := router.NewUserRouter(uc)

	rr := repo.NewRoleRepository(db)
	rpr := repo.NewRolePermissionRepository(db)
	urr := repo.NewUserRoleRepository(db)
	rs := services.NewRoleService(rr, rpr, urr)
	rc := controllers.NewRoleController(rs)
	rRouter := router.NewRoleRouter(rc)

	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(uRouter, rRouter),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("Starting server on", app.Config.Addr)
	return server.ListenAndServe()
}
