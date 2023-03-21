<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ config('app.name') }}</title>
    <link rel="icon" href="{{url('/favicon.ico')}}">
    <script type="module" crossorigin src="{{url('/build/index.js')}}"></script>
    <link type="text/css" rel="stylesheet" href="{{url('/build/index.css')}}">
</head>
<body>
<noscript>
    <strong>We're sorry but frontend doesn't work properly without JavaScript enabled. Please enable it to
        continue.</strong>
</noscript>
<div id="app"></div>

</body>
</html>
