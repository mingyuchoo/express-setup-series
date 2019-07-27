# mg-express

## 참조
[Designing a RESTful API With Node and Postgres](http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.V8DeRHV97CI)

사이트 수정 중

## 데모 사이트
https://mg-express.herokuapp.com

```
------------------------------------------------------------
URL                 HTTP Verb    Action
============================================================
/api/puppies        GET          Return ALL puppies
/api/puppies/:id    GET          Return a SINGLE puppy
/api/puppies        POST         Add a puppy
/api/puppies/:id    PUT          Update a puppy
/api/puppies/:id    DELETE       Delete a puppy
------------------------------------------------------------
```


## 기술 스택
Nodejs + Express + Bluebird + PostgreSQL + Bootstrap
