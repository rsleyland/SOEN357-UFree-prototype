build-dev:
	cd frontend && $(MAKE) build-dev
	cd backend && $(MAKE) build-dev

run-dev:
	docker compose up 
