# fuse-box-cli
[![npm](https://nodei.co/npm/fuse-box-cli.png?downloads=true&stars=true)](https://www.npmjs.com/package/fuse-box-cli)  

Fusebox is a nice piece of software, i really like it!  
There is one thing i want to do so much, and thats to give fusebox an nice CLI interface.  
For this reason i created this module.
  
# Features
- Works with zero configuration! (Just like FuseBox)
- Nice formatted help
- Powerfull options api, thanks to yargs

# Examples
## Zero configuration
**fuse.js:**
```javascript
const { FuseBox, Sparky } = require('fuse-box')
const { options } = require('fuse-box-cli')

Sparky.task('clean:dist', () => console.log('Cleaning...'))
Sparky.task('default', ['clean:dist'], () => console.log('Default ran!'))
```
Now running the script it will output something like this:  

```
D:\Programming\Projects\some-project> node fuse -h
Usage: fuse <task> [options]

Tasks:
  clean:dist
* default      The default task

Options:
  --help, -h  Show help                                                [boolean]
```
<br>

## Simple init
**fuse.js:**
```javascript
const { FuseBox, Sparky } = require('fuse-box')
const { options } = require('fuse-box-cli')
  .init({
    taskDescriptions: {
      'clean:dist': 'Cleans the dist folder'
    },
    options: {
      alert: {
        desc: 'Alerts something!',
        type: 'boolean',
        default: false
      }
    }
  })

if (options.alert) {
  console.log('ALLLLEEERRRT! ALLLEEEEERRRTTT!')
  process.exit(0)
}

Sparky.task('clean:dist', () => console.log('Cleaning...'))
Sparky.task('default', ['clean:dist'], () => console.log('Default ran!'))
```
Now running the script it will output something like this:  

```
D:\Programming\Projects\some-project> node fuse --alert
ALLLLEEERRRT! ALLLEEEEERRRTTT!
```
or
```
D:\Programming\Projects\some-project> node fuse -h
Usage: fuse <task> [options]

Tasks:
  clean:dist   Cleans the dist folder
* default      The default task

Options:
  --help, -h  Show help                                                [boolean]
  --alert     Alerts something!                       [boolean] [default: false]
```
