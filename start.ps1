# Start backend
Start-Process powershell -ArgumentList "-NoExit -Command `"cd backend; npm start`""

# Start frontend
Start-Process powershell -ArgumentList "-NoExit -Command `"npm run dev`""
