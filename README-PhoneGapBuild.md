To build project:
1. Remove "css" folder from repo-root.
2. Build.
3. Revert.

Why? Because PGB seems to copy everything from where it found `config.xml` (build folder) to root.
If there is a name conflict it just skips (no overwrite, no appending of missing files, nothing).
Also `.pgbomit` is not working as expected (folders are skipped by name and not by path -- 
so adding `.pgbomit` to /css/ also skips what would be /css/ after copying build folder -> root folder).