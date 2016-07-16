%%

\s+                   { /* skip whitespace */ }

"AND"                 { return 'TOKEN_AND'; }

"OR"                  { return 'TOKEN_OR'; }
"+"                   { yytext='OR'; return 'TOKEN_OR'; }

"NOT"                 { return 'TOKEN_NOT'; }
"-"                   { yytext='NOT'; return 'TOKEN_NOT'; }

[A-Za-z0-9_\-@]+      { return 'TOKEN_VAR'; }

"("                   { return 'TOKEN_LPAREN'; }
")"                   { return 'TOKEN_RPAREN'; }

<<EOF>>               { return 'EOF'; }

%%

module.exports = lexer;
