#!/bin/sh
 yarn typeorm migration:run
 exec "$@"