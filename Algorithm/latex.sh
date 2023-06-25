#!/usr/bin/env bash
pdflatex tdl.tex
open -a Skim tdl.pdf
open -a "Sublime Text" tdl.tex
while true; do
	fswatch --one-event tdl.tex | xargs -n1 -I{} pdflatex tdl.tex
done