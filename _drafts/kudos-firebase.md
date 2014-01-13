

## Goal

Create a kudoable element for your blog by using Firebase as the storage backend, just like described in [this blog post](http://amitu.com/2013/04/kudos-using-parse-for-jekyll/).


## Testing

Testing is done with Jasmine by integrating it with Travis-CI on GitHub.

### Integrating Jasmine with Travis

Step1: http://travisjeffery.com/b/2013/09/testing-javascript-projects-with-grunt-jasmine-jshint/  
Step2: http://about.travis-ci.org/docs/user/getting-started/#Step-one%3A-Sign-in

1. Prepare package.json and Gruntfile to support the execution of jasmine tests
2. Add basic jasmine test and verify the functioning of the configuration

### Learned

- using jasmine-contrib for console and travis integration
- sinon for faking timers is easy
- grunt tasks
  - building
  - test execution
  - compression
