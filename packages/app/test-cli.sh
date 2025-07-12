#!/bin/bash

# Test dev command
echo "Testing dev command..."
npx crax dev &
sleep 5
kill $!

# Test build command
echo "Testing build command..."
npx crax build

# Test start command
echo "Testing start command..."
npx crax start &
sleep 5
kill $!

# Test generate icons command
echo "Testing generate icons command..."
npx crax generate icons
