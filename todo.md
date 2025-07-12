# CRAX CLI Development Plan

This file tracks the development of the `create-crax-app` scaffolder and the `crax` project toolkit.

## Phase 1: Initial Setup & Scaffolding

- [x] 1. Create the directory structure for the new CLI packages.
- [x] 2. Initialize `package.json` for `create-crax-app` and `crax`.
- [x] 3. Create `tsconfig.json` for both packages.
- [x] 4. Update `pnpm-workspace.yaml` to include the new packages.
- [x] 5. Implement the basic file copying logic in `create-crax-app`.
- [x] 6. Add basic argument parsing and user-friendly output (colors, spinners).
- [x] 7. Test the `create-crax-app` scaffolder locally.

## Phase 2: Implementing the `crax` Toolkit

- [x] 1. Set up command routing (`dev`, `build`, `start`) in the `crax` package.
- [x] 2. Port the `generate:*` scripts into `crax` sub-commands.
- [x] 3. Refactor the template `app/package.json` to use the new `crax` commands.
- [ ] 4. Ensure all commands run correctly from within a generated project.

## Phase 3: Finalization

- [x] 1. Update project documentation to reflect the new CLI tools.
- [x] 2. Clean up any old, now-unused scripts from the `app` directory.
- [x] 3. Perform a final end-to-end test.
