---
layout: static
---

# Sources

<p class="header__paragraph">atoum is easy to install</p>

<section class="visual-section">
## Release process

Historically, atoum is a <a href="https://en.wikipedia.org/wiki/Rolling_release">rolling-release</a> software, it means
without any versions. While this is very challenging because no regression must be introduced, this is not always
comfortable for atoum's users that need versions, especially with a quality tool. That's why atoum uses
<a href="http://www.semver.org/">the semantic versioning specification</a> too.

You can set <a href="https://github.com/atoum/atoum/releases/latest">latest atoum's version</a>. A
<a href="https://github.com/atoum/atoum/blob/master/CHANGELOG.md">`CHANGELOG.md` file</a> is kept up-to-date.

atoum has 2 release managers. They apply the following rules:


1. If a bug has been fixed, a new version is released as soon as possible (it addresses the `z` in `x.y.z`),
2. Every 6 weeks, a new version is released containing the new features (it addresses the `y` in `x.y.z`),
3. If a backward-compatibility break is required, 2 new versions are released: a first one only with the new features
   and a second one only with the backward-compatibility break (it addresses the `x` in `x.y.z`).

Current release managers have been elected by the community and they are:

* <a href="https://github.com/Hywan">Ivan Enderlin</a>,
* <a href="https://github.com/mikaelrandy">Mikaël Randy</a>.
</section>

<section class="visual-section">
## Install with Composer

The <a href="https://getcomposer.org/">Composer</a> tool is a dependency manager. All atoum's projects are registered on
<a href="https://packagist.org/search/?q=atoum/">Packagist</a> repository under the names <code>atoum/<em>project</em></code>. Thus, the
test framework is registered under `atoum/atoum` and extensions are registered under <code>atoum/<em>extension-name</em>-extension</code>.
Consequently, assuming Composer is already installed, we need to write the following content in a `composer.json` file:

{% highlight json %}
{
    "require-dev": {
          "atoum/atoum": "~2.0"
    }
}
{% endhighlight %}

This notation means: All versions greater than `2.0` and lower than `3.0`, i.e. the latest safe major version until the
next incompatible change in the API.

One might notice that `atoum/atoum` has been declared as a `require-dev`, saying a development requirement. In fact,
we are more likely to use atoum as a development tool rather than a production tool. Running tests in production does
not sound a good idea. This may be done before releasing a software.

Thus, to finally install atoum, simply run:

{% highlight sh %}
$ composer install
{% endhighlight %}

Composer also comes with a handy command-line tool that will save (by writing in the appropriate `composer.json` file)
and install your dependency directly:

{% highlight sh %}
$ composer require --dev atoum/atoum
{% endhighlight %}

Composer will try to use a version syntax allowing to safely update to the latest version.

Finally, to update atoum, simply run:

{% highlight sh %}
$ composer update atoum/atoum
{% endhighlight %}

Now, the `atoum` binary will be located in `vendor/bin/atoum`. Testing atoum is working well can be achieved by running
its own test suites:

{% highlight sh %}
$ vendor/bin/atoum --version
$ vendor/bin/atoum --test-it
{% endhighlight %}

The first line will print the version of atoum.
</section>

<section class="visual-section">
## Install with a PHAR

PHP provides a <a href="http://php.net/phar">PHAR</a> file format, which is an executable archive likely to contain PHP
code. atoum can be used inside a PHAR file.

It is possible to <a href="https://github.com/atoum/atoum/releases/download/2.3.0/atoum.phar">download the latest PHAR
ball</a> manually or to install it with <a href="http://curl.haxx.se/">cURL</a> by running:

{% highlight sh %}
$ curl -L https://github.com/atoum/atoum/releases/download/2.3.0/atoum.phar > /usr/local/bin/atoum.phar
{% endhighlight %}

Finally, to update atoum, simply run:

{% highlight sh %}
$ php -dphar.readonly=0 atoum.phar --update
{% endhighlight %}

Note the `-dphar.readonly=0` option to make the PHAR writable for this execution.
</section>

<section class="visual-section">
## Repositories

atoum is using <a href="http://git-scm.com/">Git</a>. <a href="https://github.com/atoum/atoum">Repositories are hosted
on Github</a> under the eponym organization: atoum.

Github is used to manage and track bugs, issues, roadmap etc. If you would like to report a bug, this will happen there.
</section>
