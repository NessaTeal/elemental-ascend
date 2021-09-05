#!/bin/bash

cd "${0%/*}"

TOTAL='\033[0;35m'
NC='\033[0m'
echo -e "${TOTAL} [[Total]]"
npx cloc ../src/
echo -e "${NC}"
