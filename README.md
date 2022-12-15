# node-file-manager

Simple CLI file manager with Node.js.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)

## General info

This project is simple CLI file manager.

## Technologies

Project is created with:

- Node.js version: 18 LTS

## Setup

The program is started by npm-script start in following way:

```bash
$ npm start -- --username=your_username
```

## Features

### List of operations and their syntax:

- #### Navigation & working directory
  - Go upper from current directory (when you are in the root folder this operation doesn't change working directory):
  ```bash
  up
  ```
  - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute):
  ```bash
  cd path_to_directory
  ```
  - Print in console list of all files and folders in current directory:
  ```bash
  ls
  ```
- #### Basic operations with files:
  - Read file:
  ```bash
  cat path_to_file
  ```
  - Create empty file in current working directory:
  ```bash
  add new_file_name
  ```
  The operation fails if `new_file_name` already exists.
  - Rename file:
  ```bash
  rn path_to_file new_filename
  ```
  The operation overwrites `new_file_name` if it already exists.
  - Copy file:
  ```bash
  cp path_to_file path_to_new_directory
  ```
  `path_to_new_directory` can be ether a directory or a file. If it's a directory, the operation copies `path_to_file` to it with the same name. If it's a file, the operation fills it with `path_to_file` content.
  - Move file:
  ```bash
  mv path_to_file path_to_new_directory
  ```
  - Delete file:
  ```bash
  rm path_to_file
  ```
- #### Operating system info:
  - Get default system End-Of-Line:
  ```bash
  os --EOL
  ```
  - Get host machine CPUs info:
  ```bash
  os --cpus
  ```
  - Get home directory:
  ```bash
  os --homedir
  ```
  - Get current _system user name_:
  ```bash
  os --username
  ```
  - Get CPU architecture:
  ```bash
  os --architecture
  ```
- #### Hash calculation
  - Calculate hash for file:
  ```bash
  hash path_to_file
  ```
- #### Compress and decompress operations
  - Compress file:
  ```bash
  compress path_to_file path_to_destination
  ```
  - Decompress file:
  ```bash
  decompress path_to_file path_to_destination
  ```
