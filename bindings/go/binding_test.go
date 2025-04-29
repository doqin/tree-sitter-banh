package tree_sitter_banh_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_banh "github.com/doqin/tree-sitter-banh.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_banh.Language())
	if language == nil {
		t.Errorf("Error loading Bánh grammar")
	}
}
