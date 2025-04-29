
/**
 * @file Tree-sitter grammar for Bánh programming language
 * @author doqin
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-nocheck

module.exports = grammar({
  name: "banh",

  // Skip whitespace and comments automatically
  extras: $ => [/[ \t\r\n]+/, $.comment, /;/],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.function_declaration,
      $.procedure_declaration,
      $.variable_declaration,
      $.if_statement,
      $.return_statement,
      $.expression_statement
    ),

    // Single-line comments
    comment: _ => /\/\/.*/,

    function_declaration: $ => seq(
      'hàm',
      field('name', $.identifier),
      '(',
      optional($.parameter_list),
      ')',
      '->',
      $.type,
      repeat($._statement),
      'kết thúc'
    ),

    procedure_declaration: $ => seq(
      'thủ tục',
      field('name', $.identifier),
      '(',
      optional($.parameter_list),
      ')',
      repeat($._statement),
      'kết thúc'
    ),

    parameter_list: $ => sepBy1(',', $.parameter),
    parameter: $ => seq($.identifier, $.type_separator, $.type),

    variable_declaration: $ => seq(
      'biến',
      $.identifier,
      $.type_separator,
      $.type,
      optional(seq(':=', $.expression))
    ),

    if_statement: $ => seq(
      'nếu',
      $.expression,
      'thì',
      repeat($._statement),
      optional(seq('không thì', repeat($._statement))),
      'kết thúc'
    ),

    return_statement: $ => seq('trả về', $.expression),
    expression_statement: $ => seq($.expression),

    // Expressions
    expression: $ => choice(
      $.binary_expression,
      $.prefix_expression,
      $.call_expression,
      $.identifier,
      $.number,
      $.parenthesized_expression
    ),

    call_expression: $ => prec(10, seq(
      field('name', $.identifier),
      '(',
      optional($.argument_list),
      ')'
    )),

    argument_list: $ => sepBy1(',', $.expression),

    parenthesized_expression: $ => seq('(', $.expression, ')'),

    // Unary prefix (for e.g. -1.0)
    prefix_expression: $ => prec(9, seq(
      choice('-', '+'),
      $.expression
    )),

    binary_expression: $ => prec.left(1, seq(
      $.expression,
      choice('+', '-', '*', '/', '=', '<=', '<', '>=', '>', '!='),
      $.expression
    )),

    identifier: _ => /[\p{L}_][\p{L}\p{N}_]*/u,
    number: _ => /\d+(?:\.\d+)?/,
    type: _ => choice('Z32', 'R64'),

    // The type-separator token (formerly 'E')
    type_separator: _ => 'E',
  }
});

// Helper to write comma-separated lists
function sepBy1(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)));
}

