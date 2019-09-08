--- build/npm/postinstall.js.orig	2019-09-03 21:16:39 UTC
+++ build/npm/postinstall.js
@@ -20,7 +20,8 @@ function yarnInstall(location, opts) {
 	const raw = process.env['npm_config_argv'] || '{}';
 	const argv = JSON.parse(raw);
 	const original = argv.original || [];
-	const args = original.filter(arg => arg === '--ignore-optional' || arg === '--frozen-lockfile');
+	const passargs = ['--ignore-optional', '--frozen-lockfile', '--offline', '--no-progress', '--verbose'];
+	const args = original.filter(arg => passargs.includes(arg));
 
 	console.log(`Installing dependencies in ${location}...`);
 	console.log(`$ yarn ${args.join(' ')}`);
@@ -70,7 +71,7 @@ runtime "${runtime}"`;
 }
 
 yarnInstall(`build`); // node modules required for build
-yarnInstall('test/smoke'); // node modules required for smoketest
+// yarnInstall('test/smoke'); // node modules required for smoketest
 yarnInstallBuildDependencies(); // node modules for watching, specific to host node version, not electron
 
 // Remove the windows process tree typings as this causes duplicate identifier errors in tsc builds
@@ -110,8 +111,7 @@ const requireSameVersionsInRemote = [
 	'xterm',
 	'xterm-addon-search',
 	'xterm-addon-web-links',
-	'node-pty',
-	'vscode-ripgrep'
+	'node-pty'
 ];
 
 requireSameVersionsInRemote.forEach(packageName => {
