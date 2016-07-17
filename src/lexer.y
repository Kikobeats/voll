WORD                  [A-Za-z0-9\u00C0-\u00FF_\-@]+
QUOTE_WORD            ["'][^\'"]+['"]

%%

\s+                   { /* skip whitespace */ }

"AND"                 { return 'TOKEN_AND'; }

"OR"                  { return 'TOKEN_OR'; }
"+"                   { yytext='OR'; return 'TOKEN_OR'; }

"NOT"                 { return 'TOKEN_NOT'; }
"-"                   { yytext='NOT'; return 'TOKEN_NOT'; }

{QUOTE_WORD}          { yytext = yytext.replace(/["']/g, ''); return 'TOKEN_VAR'; }
{WORD}                { return 'TOKEN_VAR'; }

"("                   { return 'TOKEN_LPAREN'; }
")"                   { return 'TOKEN_RPAREN'; }

<<EOF>>               { return 'EOF'; }

%%

module.exports = lexer;
