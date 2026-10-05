#!/usr/bin/env python3
"""Regenerate per-page attributed links from the reviewed build's campaign function."""
import subprocess, sys
from pathlib import Path
subprocess.run([sys.executable,str(Path(__file__).with_name('build.py'))],check=True)
