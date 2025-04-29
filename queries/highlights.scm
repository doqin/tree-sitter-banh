
;; queries/highlights.scm

(identifier) @variable

;; Function names
(function_declaration
  name: (identifier) @function)

;; Procedure names
(procedure_declaration
  name: (identifier) @function)

;; Call expression
(call_expression
  name: (identifier) @function)

;; Keywords
[
  "hàm" "thủ tục" "nếu" "thì" "không thì" "trả về" "biến" "kết thúc"
] @keyword

;; Types
(type) @type

;; Numbers
(number) @number

;; Operators
[
  "+" "-" "*" "/" "=" "<=" "<" ">=" ">" "!=" "->" ":=" (type_separator)
] @operator

;; Comments
(comment) @comment

