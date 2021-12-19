# Google App Engine environment variables compiler

Compiles app.yaml environment variables with GitHub Secrets

## Inputs

### `path`

Path to your `app.yaml` file

## Example usage

`app.yaml` file:
```yaml
service: default
runtime: go114

env_variables:
  SECRET: $SECRET
  ANOTHER_SECRET: $ANOTHER_SECRET
```

workflow:
```yaml
id: 'gae-env-compile'
uses: 'jacoz/gae-env-compile-action@v0.1'
env:
  SECRET: ${{ secrets.MY_SECRET }}
  ANOTHER_SECRET: ${{ secrets.OTHER_SECRET }}
```
