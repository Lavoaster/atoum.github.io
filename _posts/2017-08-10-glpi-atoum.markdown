---
layout: post
title: "GLPI migrate to atoum"
date: 2017-08-10 10:00:00
author: "@Grummfy"
categories: news
---

The [GLPI project][GLPI] [recently announced][announced-en][^1] that they have migrated their unit test suites to atoum. So let's get back on
this news. We interviewed [Johan Cwiklinski](https://github.com/trasher) and some other members of the project's official team about this migration.

## 1. Can you summarize the GLPI project and its usage of PHP?

[GLPI][GLPI] is an open source IT asset management and Service Desk software. The project has started 15 years ago and is written in PHP.
The project was led by an association until 2015, and since then the development is headed by [Teclib](http://www.teclib.com).

Since 2015, we are trying to rewrite and modernise the whole project, starting with the backend.

## 2. When did you start using unit tests for the project?

Firstly, one regular contributor has tried to add unit tests into the project in 2010. But project managers did not follow him, and it was quickly abandoned.
Forward to 2015, the same contributor tried again to add tests on the project, with much more success :)

## 3. What kind of difficulties did you encounter with PHPUnit? Why did you choose atoum instead of other tools to resolve it?

We didn’t really face issues with PHPUnit. This is more a technical choice for atoum capabilities, like:

* Testing variable types (if you test an integer and get a string, this is not correct),
* Wonderful mocking system (that allows mocking PHP native functions, constants, …),
* Use closure to test outputs, exceptions, … (way more interesting than PHPUnit’s annotations),
* Concurrent run of test cases (even if it has been disabled for GLPI),
* Fully isolated test cases,
* Chained calls,
* More natural way to write tests (this is maybe just my point of view - but this is really simpler to me).

Last but not least: atoum is a French project at the origin, just like GLPI!

## 4. Can you tell us why you have disabled the concurrent test for the GLPI project?

In some case, due to the current GLPI code, some tests could not be run concurrently, this cause unpredictable results. Also, GLPI uses a huge 
array in the standard session for configuration, we also had trouble with this :-/

We plan to work on those issues later, but this is a huge job we cannot do right now.

## 5. Did you face some issues during the migration from PHPUnit to atoum?

Well… We had to entirely rewrite our test suites. It’s more painful than a difficult work at first, but finally, we haven't spent too much time on this rewrite work.
Of course, we didn’t implement all atoum features, but we plan to update our tests in the future.

We did have a really basic usage of PHPUnit. The only thing that required much more work was the `@depends`[^2] capability of PHPUnit.
That was quite easy to change and brought some nice benefits: We now run all our tests from a fresh, out of the box GLPI environment.

Another issue was that atoum is much less permissive than PHPUnit per default, but this was not a real issue because we got many little things fixed (such as PHP notices…).

Here is some telemetry information regarding these tests:
* We had 25 tested classes with PHPUnit, and (of course!) still 25 with atoum,
* There were about 2600 assertions with PHPUnit, but more than 5000 with atoum. This came for various reasons, one was that many returns were not tested and led to un-understandable situations,
* I’ve spent about *2 or 3 work days* to achieve the *complete migration*. I’ve also taken a few hours to migrate already opened pull requests that provided unit tests,
* Since atoum migration, some tests have been added. We now test 66 classes with 9000 assertions[^3] :),
* Running tests on Travis took 2-3 minutes with PHPunit and 3-4 with atoum. But since we’ve added many new assertions, and we do not use atoum multi-threading capabilities, this is not really relevant for us. ;)
    
## 6. Did you see a difference in the way you maintain or develop the project since you have added unit test?

Well…

On the development side, we generally spend more time writing new features since we require unit tests to be added. And we also try to write
tests on issues we fix, to reproduce them for the first time and then to prevent future regressions. That’s mainly how our process has changed for 
the moment.

On the project governance, we have to convince our contributors to write unit tests… This is not really an easy part :D

## 7. Did you have any advice for other people that would like to migrate to atoum from PHPUnit?

First of all, I’d advise people to write unit tests.

Most people I know actually use PHPUnit because they’ve always used it, so let’s give atoum a try, …) Well, at least try it, on a new project for example,
or just on a small part of your code.

## 8. You recently receive a price related to security, can you tell us more about it?

[Teclib](http://www.teclib.com) has been involved in a project to adapt it to match SoC (Security operation centre) requirements. The project had also been an opportunity to develop a REST API.

Being part of the OW2 Consortium community, GLPI [received][award-link] the [2017 Technology Council special prize][award-tweet] for its work on addressing security requirements but 
also the big working currently being made to modernize the framework. The jury has mentioned the implementation of unit tests and the switch from PHPUnit to atoum!

![Picture of award winning](https://pbs.twimg.com/media/DDRlUoSXgAAXBIp.jpg "Award winning")

## 9. If you have anything else to say, please feel free!

I’ve been involved in various projects (open source or not) for years. As many developers, I was not really aware of unit testing.
When I’ve started to write unit tests on my PHP applications, I chose PHPUnit (the only one I’d heard about at the time) but never really liked it.

When I’ve discovered atoum (I don’t remember exactly when, but that was far before the first semver release), I’ve immediately loved it. That was much
clearer to me to understand and write tests. I began to like that…
I’ve used atoum in several closed source projects (even when the "frameworks" say to use something else), but also in [Galette](http://galette.eu)[^4],
which has unit tests powered by atoum since 2013.



## Final word
I would like to thank Johan and his team for this valuable feedback, it was really interesting to speak with end user of atoum. It's always challenging to see what a project
like this one can bring to others and I hope you also like it. If you use atoum on your project, we would be happy to hear some feedback about it, it's always important for us.


[^1]: The [announce](http://glpi-project.org/spip.php?breve374) in French
[^2]: Making possible for one test to depend on another, and to get the results of the first one as a parameter of the second one.
[^3]: GLPI use atoum since two month (PR was merged on 2017-06-07)
[^4]: Galette is an open source membership management web application towards non-profit organisations.
[GLPI]: http://glpi-project.org/
[announced-en]: http://glpi-project.org/spip.php?breve375
[award-link]: https://www.ow2con.org/bin/view/2017/Awards_Results
[award-tweet]: https://twitter.com/ow2/status/879440229593214977
