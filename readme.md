# sample-node-typescript-module

# **Mocha version 6 demonstration branch**

please run ``` npm run test:watch-mocha```

to see the issue. Edit src/extractTags/index.ts 

and the change is not detected.



## Description
Every day now we hear that [more people](http://slides.com/seldo/npm-future-of-javascript-qcon#/72) are using typescript.
Some of us grew up with types and some of us never knew types. I'm not going to argue the toss. But we can choose either
now. [Typescript](http://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) is easy I'm told. Well like
all things it is easy to do the basic hello world but how do you setup a proper project?

The intent of this [repo](https://github.com/ghinks/sample-node-typescript-module) is simply to put a stake in the ground
and create an NPM module using typescript that could be copied as a starter project.

[Yes there are sample projects on the typescriptlang site](http://www.typescriptlang.org/samples/index.html) but having
had a good look I am not sure they fit the use case I want exactly.

Here are my goals. 

- typescript transpilation via [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)
- [eslint](https://www.npmjs.com/package/@typescript-eslint/parser) rather than tslint as that is how MS are moving
- [nyc](https://www.npmjs.com/package/nyc) code coverage
- typescript [prettier](https://www.npmjs.com/package/prettier)   
- [definition file](http://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html), create a definition file that can be used when this module is published
- publishable package with a declarations file
- build/test/lint on osx, linux and windows via [travis](https://travis-ci.com/ghinks/sample-node-typescript-module)

## Decisions made

### eslint rather than tslint
I think this is the way the community is going. I'm not sure of course. Eslint is very widely used
already. This is a good place to describe how to set it up. The key learning I had when setting it 
up was that typescript linting required a different [parser](https://www.npmjs.com/package/@typescript-eslint/parser).
A [plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) will also
be required. The typescript have decided this the way forwards and the following links support this.

- [tslint vs eslint](https://www.npmtrends.com/eslint-vs-tslint)
- [The future of typescript eslint](https://eslint.org/blog/2019/01/future-typescript-eslint)
- [typescript 2019 roadmap](https://github.com/Microsoft/TypeScript/issues/29288)

This little gem is from the parse repo.

```
"There is sometimes an incorrect assumption that the parser itself 
is what does everything necessary to facilitate the use of ESLint 
with TypeScript. In actuality, it is the combination of the parser 
and one or more plugins which allow you to maximize your usage of 
ESLint with TypeScript"
```


quote from the road map

```
"Given this, our editor team will be focusing on leveraging ESLint rather than duplicating work. For 
scenarios that ESLint currently doesn't cover (e.gl. semantic linting or program-wide linting), 
we'll be working on sending contributions to bring ESLint's TypeScript support to parity with TSLint. 
As an initial testbed of how this works in practice, we'll be switching the TypeScript repository over 
to using ESLint, and sending any new rules upstream."
```

### mocha rather than jest, you decide
After having looked long and hard at jest I feel that Jest is terrific but all the test
frameworks do a good job. There are lots of choices I have decided to write unit tests in both
mocha and jest (this is an example project). Of course jest includes coverage. So for mocha you
would need nyc/istanbul. 

| test framework | file extension |
|----------------|----------------|
| mocha          | *.spec.ts      |
| jest           | *.test.ts      |

#### nyc code coverage
Well jest uses istanbul under the covers so you may as well just use [nyc](https://www.npmjs.com/package/nyc)
You can delete this and the mocha dependencies too if you go for jest.


### Building with **@babel/preset-typescript** rather than tsc
Well under the covers it is the same thing, but my prefence is for babel. 


### Simple definition file
The declaration command only emits all the typescript declarations. If you only require one, then you have to emit the
definitions to a separate folder and copy the public facing definition to you target lib or dist folder.

### windows
I have done my best to make sure this works on
- osx
- linux
- windows

[travis](https://travis-ci.com/ghinks/sample-node-typescript-module)
