package router

import (
	"AuthService/controllers"
	"AuthService/middlewares"
	"AuthService/utils"

	"github.com/go-chi/chi/v5"
)

type Router interface {
	Register(r chi.Router)
}

func SetupRouter(UserRouter Router) *chi.Mux {
	chiRouter := chi.NewRouter()

	chiRouter.Use(middlewares.RateLimitMiddleware)

	chiRouter.Get("/ping", controllers.PingHandler)

	chiRouter.HandleFunc("/fakestoreservice/*", utils.ProxyToService("https://fakestoreapi.in", "/fakestoreservice"))

	UserRouter.Register(chiRouter)

	return chiRouter
}
