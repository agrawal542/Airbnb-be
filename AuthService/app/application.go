package app

import (
	dbConfig "AuthService/config/db"
	config "AuthService/config/env"
	"AuthService/controllers"
	repo "AuthService/db/repositories"
	"AuthService/router"
	"AuthService/services"
	"database/sql"
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Addr string
}

type Application struct {
	Config Config
	Store  repo.Storage
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
		Store:  *repo.NewStorage(),
	}
}

func (app *Application) Run(dbInstance *sql.DB) error {

	db, err := dbConfig.SetupDB()
	if err != nil {
		fmt.Println("Error setting an database:", err)
		return err
	}

	ur := repo.NewUserRepository(db)
	us := services.NewUserService(ur)
	uc := controllers.NewUserController(us)
	uRouter := router.NewUserRouter(uc)

	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(uRouter),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("Starting server on", app.Config.Addr)
	return server.ListenAndServe()
}
