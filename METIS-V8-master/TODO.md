# TODO - Fix TypeScript Errors in Grid Components

## Overview
Fix TypeScript errors related to MUI Grid component usage across the project. The errors are due to missing 'item' prop on Grid children inside Grid containers.

## Tasks

### 1. Fix Grid in ControlePonto.tsx
- **File:** src/routes/rh/ControlePonto.tsx
- **Issue:** Grid children missing 'item' prop
- **Action:** Add `item` prop to all Grid children inside containers
- **Status:** Pending

### 2. Fix Grid in FluxoCaixa.tsx
- **File:** src/routes/financeiro/FluxoCaixa.tsx
- **Issue:** Grid children missing 'item' prop
- **Action:** Add `item` prop to all Grid children inside containers
- **Status:** Pending

### 3. Fix Grid in FolhaDePagamento.tsx
- **File:** src/routes/financeiro/FolhaDePagamento.tsx
- **Issue:** Some Grid children may be missing 'item' prop
- **Action:** Verify and add `item` prop where missing
- **Status:** Pending

### 4. Fix Grid in DetalhesPonto.tsx
- **File:** src/routes/rh/DetalhesPonto.tsx
- **Issue:** Grid children missing 'item' prop
- **Action:** Add `item` prop to all Grid children inside containers
- **Status:** Pending

### 5. Fix Grid in PerfilColaborador.tsx
- **File:** src/routes/rh/PerfilColaborador.tsx
- **Issue:** Grid children missing 'item' prop
- **Action:** Add `item` prop to all Grid children inside containers
- **Status:** Pending

### 6. Verify DashboardPage.tsx
- **File:** src/admin/DashboardPage.tsx
- **Issue:** Already has 'item' prop, verify correctness
- **Action:** Check if all Grid usages are correct
- **Status:** Pending

## Testing
- Run `npm run lint` to check for TypeScript errors
- Run `npm run build` to ensure no build errors
- Test affected pages for layout issues

## Notes
- MUI Grid v5+ requires 'item' prop on Grid children inside containers
- Alternative: Replace Grid with Box and flexbox if Grid issues persist

## Why the Errors are Happening
The TypeScript errors in the terminal are due to incorrect usage of MUI Grid components:
- In MUI v5+, Grid children inside a `container` must have the `item` prop
- The responsive props (xs, sm, md, lg, xl) should be on the Grid item, not directly on Grid
- Example: `<Grid item xs={12} md={4}>` instead of `<Grid xs={12} md={4}>`
- Files with missing 'item' prop cause TypeScript to report unknown prop errors
- This is a breaking change from MUI v4 to v5+
