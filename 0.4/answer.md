```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new-note
    activate server
    server-->>browser: 302 URL redirect
    deactivate server
    Note right of browser: The server asks the browser to perform a new HTTP GET request.
```
