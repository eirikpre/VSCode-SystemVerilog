grammar Attributes;
import Comments;

attribute_instance : '(*' attr_spec ( ',' attr_spec )* '*)' ;
attr_spec : attr_name ( '=' constant_expression )? ;
attr_name : identifier ;
