python -m tensorflow.python.tools.optimize_for_inference \
--input=static/models/output_graph.pb --output=optimized_graph.pb \
--input_names="Placeholder" --output_names="final_result"