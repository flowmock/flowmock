# FlowMock

A flow-based a high performance programmable HTTP mocker and proxy.  It is designed to enable testing of difficult to setup scenarios or to support/replace 3rd party sandbox enviornments in pre-production enviornment.

## Features

- Visually define mock behavior using a flow-based programming model.
- Pass-through proxy with logging.
- Intuitively convert requests in logs into mocks.
- Complex trigger condition for mocks.
- Templatable response using placeholder variables.
- Single instance can handle mocking multiple endpoints.
- Adaptable database backend for persistence.
- FlowMock Admin Portal (FAP) with backing admin API.
- Extensible hooks for almost everything.

## Typical Usage

1. Run FlowMock as a service in pre-production environments.
2. Add proxy mapping to a target service's dependency endpoint to FlowMock.
3. Replace dependency endpoint in target service with FlowMock.
4. Now all traffic from target service is flowing through FlowMock.
5. Fire off an integration test or operation to mock against the target service.
6. Using the FlowMock Admin Portal (FAP), review logs in the proxy logger and select a request/response entry to convert to a mock.
7. Define the trigger condition for the mock using the flow editor.  Conditions can be as simple as no condition, i.e. always on and conditionally settable by the Admin API.  Or for more complex scenarios, based on data in the request url/header/body and/or FlowMock environment state such as request iteration, or environment variables.
8. Traffic is now mocked when the condition is met and pass-through proxy continues to handle the rest of the traffic.
9. Repeat step 6-8 until all requests are mocked.
