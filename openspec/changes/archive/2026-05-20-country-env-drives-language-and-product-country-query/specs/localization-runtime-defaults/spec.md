## ADDED Requirements

### Requirement: Localization Default Honors Resolved Country
Localization runtime defaults SHALL use resolved webshop country to determine startup language default.

#### Scenario: Startup default set to Swedish in Sweden
- **WHEN** app starts with resolved webshop country `SE`
- **THEN** localization initializes with Swedish default unless user has explicit prior selection

#### Scenario: Startup default set to Finnish in Finland fallback
- **WHEN** app starts with resolved webshop country `FI`
- **THEN** localization initializes with Finnish default behavior unless user has explicit prior selection
