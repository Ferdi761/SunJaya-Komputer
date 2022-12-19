# API SunJaya Com

## Table of Contents

- [Cara Penggunaan](#tutor)
- [Akun](#akun)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## Cara Penggunaan <a name="tutor"></a>

Sebelum menggunakan API SunJaya Com, clone/download repository ini ke penyimpanan komputer lokal lalu install <a href="https://www.postman.com/downloads/">Postman</a> terlebih dahulu.<br/>
Jika telah terinstall, buka postman dan masukkan salah satu url yang tersedia dan atur juga methodnya serta atur id dan request body jika diperlukan lalu klik tombol "send".<hr/>

## DAFTAR API

### AKUN <a name = "akun"></a>

API ini berfungsi mengelola akun.

- Membuat Akun Baru

```
url: http://localhost:8000/api/signup/
method: POST

// contoh input body
body: {
"nama" : "Joko",
"email" : "jokojosambat@gmail.com",
"password" : "inipass123",
"noTelp" : "083192835768"
}
```

- Login Akun

```
url: http://localhost:8000/api/login/
method: POST

// contoh input body
body: {
"email" : "jokojosambat@gmail.com",
"password" : "inipass123",
}
```

- Logout Akun

```
url: http://localhost:8000/api/logout/
method: POST
```

- Daftar Semua Akun

API ini hanya dapat digunakan jika melakukan login dengan izin sebagai admin SunJaya Com.

```
url: http://localhost:8000/api/akun/admin/all/
method: GET
```

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## Usage <a name = "usage"></a>

Add notes about how to use the system.
